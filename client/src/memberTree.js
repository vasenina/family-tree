import Graph from "react-graph-vis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
//import "./network.css";

export default function MemberTree() {
    const { id } = useParams();
    const [edges, setEdges] = useState();

    const family = useSelector((state) => state.familyTree);
    // console.log("FAMILY", family);

    let history = useHistory();

    useEffect(() => {
        if (family?.length > 0) {
            const result = generateEdges(family, id);
            console.log("NEW RESULT", result);

            setEdges(result.edges);

            setGraph({
                nodes: generateMemberNodes(result.memberList),
                edges: result.edges,
            });
        }
    }, [family]);

    const [graph, setGraph] = useState();

    // const graph = {
    //     nodes: testUsers,
    //     edges: edges,
    // };

    console.log("GRAPH", graph);

    const options = {
        autoResize: false,
        interaction: { zoomView: false },
        nodes: {
            shape: "image",
            borderWidth: 2,
            borderWidthSelected: 3,
            color: {
                border: "#1e3a60",
                hover: {
                    border: "#f3fa9d",
                },
            },

            font: {
                color: "#1e3a60",
            },
        },
        layout: {
            hierarchical: {
                //parentCentralization: true,
                sortMethod: "directed",
                // direction: "UD",
                shakeTowards: "roots",
            },
            //improvedLayout: true,
        },
        // physics: {
        //     barnesHut: {
        //         springLength: 1000,
        //         springConstant: 1,
        //         avoidOverlap: 1,
        //         //avoidOverlap: 1,
        //     },
        // },
        edges: {
            color: "#1e3a60",
            arrows: {
                from: {
                    type: "image",
                },
                to: {
                    type: "image",
                },
            },
        },
        height: "500px",
    };

    const events = {
        select: function (event) {
            console.log("select");
            var { nodes, edges } = event;
        },
        doubleClick: (ev) => {
            console.log("Nodesn", ev.nodes[0]);
            history.push("/member/" + ev.nodes[0]);
        },
    };
    return (
        <>
            {graph && (
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                    getNetwork={(network) => {}}
                />
            )}
        </>
    );
}
function generateMemberNodes(memberList) {
    return memberList?.map((member) => {
        return {
            id: member.id,
            label: `${member.first} ${member.last}`,
            image: member.image_url || "/default-member.png",
            hidden: false,
        };
    });
}

function makeFamilyDictionary(family) {
    let newFamily = {};
    for (let i = 0; i < family.length; i++) {
        newFamily[family[i].id] = {
            id: family[i].id,
            last: family[i].last,
            first: family[i].first,
            image_url: family[i].image_url,
            child: family[i].child ? [...family[i].child] : null,
            parent: family[i].parent ? [...family[i].parent] : null,
        };
    }
    return newFamily;
}

function generateEdges(family, member_id) {
    console.log("Relations", family);
    const familyDict = makeFamilyDictionary(family);
    console.log("Dictionary", familyDict);
    let memberList = [];
    const edges = [
        ...deapSearchParents(familyDict, member_id, memberList),
        ...deapSearchChildren(familyDict, member_id, memberList),
    ];

    // selectTreeUsers(users);
    console.log(edges);

    return { edges, memberList };
}

function deapSearchParents(dictionary, id, memberList) {
    console.log("DEAP Search");
    let edgesArr = [];
    let queue = [];

    queue.push(dictionary[id]);
    memberList.push(dictionary[id]);
    while (queue.length > 0) {
        let current = queue.shift();
        if (current.parent?.length > 0) {
            for (let parent of current.parent) {
                queue.push(dictionary[parent]);
                memberList.push(dictionary[parent]);
                edgesArr.push({ from: parent, to: current.id });
                // console.log("EDGES ARR", edgesArr);
            }
        }
    }
    // console.log("final arr PARENT", edgesArr);
    return edgesArr;
}

function deapSearchChildren(dictionary, id, memberList) {
    console.log("DEAP Search");
    let edgesArr = [];
    let queue = [];

    queue.push(dictionary[id]);
    while (queue.length > 0) {
        let current = queue.shift();
        if (current.child?.length > 0) {
            for (let child of current.child) {
                queue.push(dictionary[child]);
                memberList.push(dictionary[child]);
                edgesArr.push({ from: current.id, to: child });
                // console.log("EDGES ARR", edgesArr);
            }
        }
    }
    // console.log("final arr CHILD", edgesArr);
    return edgesArr;
}
