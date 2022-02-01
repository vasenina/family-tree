import Graph from "react-graph-vis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//import "./network.css";

export default function FamilyTree() {
    const [edges, setEdges] = useState([]);
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
        console.log("NEt useEffect");
        fetch("/api/relations")
            .then((res) => res.json())
            .then((data) => {
                console.log("net in data", data);
                if (data.success) {
                    console.log(data);
                    const graphEdges = data.relations.map((edge) => {
                        const newEdge = {
                            from: edge.member_id,
                            to: edge.relative_id,
                        };
                        return newEdge;
                    });
                    setEdges(graphEdges);
                }
            });
    }, []);

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
            // hierarchical: {
            //     parentCentralization: true,
            //     sortMethod: "directed",
            //     direction: "UD",
            //     shakeTowards: "roots",
            // },
            improvedLayout: true,
        },
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
