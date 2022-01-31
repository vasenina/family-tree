import Graph from "react-graph-vis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//import "./network.css";

export default function FamilyTree() {
    const [users, setUsers] = useState([
        {
            id: 1,
            label: "first",
            image: "http://127.0.0.1:3000/default-member.png",
        },
        { id: 2, label: "second" },
    ]);
    const [edges, setEdges] = useState([{ from: 1, to: 2 }]);
    // const users = useSelector((state) => {
    //     return state.familyTree?.map((member) => {
    //         return {
    //             id: member.id,
    //             label: `${member.first} ${member.last}`,
    //             // image: member.image_url,
    //         };
    //     });
    // });
    let history = useHistory();
    useEffect(() => {
        // console.log("NEt useEffect");
        // fetch("/api/get-network")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("net in data", data);
        //         if (data.success) {
        //             const graphUsers = data.users.map((user) => {
        //                 const graphUser = {
        //                     id: user.id,
        //                     label: `${user.first} ${user.last}`,
        //                     shape: "circularImage",
        //                     image: user.image_url,
        //                 };
        //                 return graphUser;
        //             });
        //             setUsers(graphUsers);
        //             const graphEdges = data.edges.map((edge) => {
        //                 const newEdge = {
        //                     from: edge.sender_id,
        //                     to: edge.recipient_id,
        //                 };
        //                 return newEdge;
        //             });
        //             setEdges(graphEdges);
        //         }
        //     });
    }, []);

    console.log("Net users", users);
    console.log("Net edges", edges);
    const graph = {
        nodes: users,
        edges: edges,
    };

    console.log("GRAPH", graph);

    const options = {
        layout: {
            hierarchical: true,
        },
    };

    // const options = {
    //     autoResize: false,
    //     nodes: {
    //         // image: { unselected: "/default-member.png" },
    //         // brokenImage: "/default-member.png",
    //         shape: "square",
    //         borderWidth: 2,
    //         borderWidthSelected: 3,
    //         color: {
    //             border: "#1e3a60",
    //             hover: {
    //                 border: "#f3fa9d",
    //             },
    //         },

    //         font: {
    //             color: "#1e3a60",
    //         },
    //     },
    //     layout: {
    //         hierarchical: true,
    //         // improvedLayout: true,
    //     },
    //     edges: {
    //         color: "#1e3a60",
    //         arrows: {
    //             from: {
    //                 type: "image",
    //             },
    //             to: {
    //                 type: "image",
    //             },
    //         },
    //     },
    //     height: "500px",
    // };

    const events = {
        select: function (event) {
            console.log("select");
            var { nodes, edges } = event;
        },
        doubleClick: (ev) => {
            // console.log(ev.node.id);
            console.log("Nodesn", ev.nodes[0]);
            // if (user.id == props.currentId) {
            //     console.log(user.id, props.currentId);
            //     history.replace("/");
            // } else {
            history.push("/member/" + ev.nodes[0]);
            // }
        },
    };
    return (
        <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
    );
}
