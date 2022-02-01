import Graph from "react-graph-vis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
//import "./network.css";

export default function MemberTree() {
    const { id } = useParams();
    const [edges, setEdges] = useState([
        { from: 2, to: 4 },

        { from: 7, to: 2 },
        { from: 8, to: 2 },
        { from: 1, to: 4 },
        { from: 9, to: 1 },
    ]);

    const family = useSelector((state) => state.familyTree);
    console.log("FAMILY", family);
    const users = useSelector((state) => {
        return state.familyTree?.map((member) => {
            return {
                id: member.id,
                label: `${member.first} ${member.last}`,
                image: member.image_url || "/default-member.png",
            };
        });
    });
    let history = useHistory();

    useEffect(() => {
        if (family?.length > 0) {
            setEdges(generateEdges(family, id));
        }
    }, [family]);
    // useEffect(() => {
    //     console.log("NEt useEffect");
    //     fetch("/api/relations")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("net in data", data);
    //             if (data.success) {
    //                 console.log(data);
    //                 const graphEdges = data.relations.map((edge) => {
    //                     const newEdge = {
    //                         from: edge.member_id,
    //                         to: edge.relative_id,
    //                     };
    //                     return newEdge;
    //                 });
    //                 setEdges(graphEdges);
    //             }
    //         });
    // }, []);

    console.log("Net users", users);
    console.log("Net edges", edges);
    const graph = {
        nodes: users,
        edges: edges,
    };

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
        <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => {}}
        />
    );
}

function makeFamilyDictionary(family) {
    let newFamily = {};
    for (let i = 0; i < family.length; i++) {
        newFamily[family[i].id] = {
            id: family[i].id,
            last: family[i].last,
            first: family[i].first,
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
    const edges = [
        ...deapSearchParents(familyDict, member_id),
        ...deapSearchChildren(familyDict, member_id),
    ];
    console.log(edges);

    return edges;
}

function deapSearchParents(dictionary, id) {
    console.log("DEAP Search");
    let edgesArr = [];
    let queue = [];
    console.log("deapSearch");
    queue.push(dictionary[id]);
    while (queue.length > 0) {
        let current = queue.shift();
        if (current.parent?.length > 0) {
            for (let parent of current.parent) {
                queue.push(dictionary[parent]);
                edgesArr.push({ from: parent, to: current.id });
                // console.log("EDGES ARR", edgesArr);
            }
        }
    }
    console.log("final arr PARENT", edgesArr);
    return edgesArr;
}

function deapSearchChildren(dictionary, id) {
    console.log("DEAP Search");
    let edgesArr = [];
    let queue = [];
    console.log("deapSearch");
    queue.push(dictionary[id]);
    while (queue.length > 0) {
        let current = queue.shift();
        if (current.child?.length > 0) {
            for (let child of current.child) {
                queue.push(dictionary[child]);
                edgesArr.push({ from: current.id, to: child });
                // console.log("EDGES ARR", edgesArr);
            }
        }
    }
    console.log("final arr CHILD", edgesArr);
    return edgesArr;
}
