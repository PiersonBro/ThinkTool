import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.css';
import 'jsplumb';

// Add connection nodes to noteblocks
// Load connections from note relationships

class Diagram extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'React',
            notes: [], // Each note gets a connection node 
            connections: [], // Each preexisting connection 
        };
    }

    componentDidMount() {
        setTimeout(function () { //Start the timer
            this.setState({ render: true }) //After 1.5 seconds, set render to true

            this.setState({ render: true }) //After 1.5 seconds, set render to true
            var els = document.querySelectorAll(".wrapper");

            var common = {
                isSource: true,
                isTarget: true,
                connector: "Bezier",
                connectorStyle: { outlineStroke: "#18c2ce", strokeWidth: 1 },
                connectorHoverStyle: { strokeWidth: 2 },
                endpoint: ["Rectangle", {
                    cssClass: "diagramPoint",
                    width: 20,
                    height: 20,
                    paintStyle: { outlineStroke: "#18c2ce", strokeWidth: 3 },
                    hoverPaintStyle: { outlineStroke: "lightblue" },
                    anchors: ["Right", "Left", "Bottom", "Top"],
                    maxConnections: 3
                }],
                // overlays: [
                //             ["Arrow", { foldback: 0.2 }],
                //             ["Label", { cssClass: "labelClass" }],]
            };

            // var commonEndpoint =
            //     ["Rectangle", {
            //         cssClass: "diagramPoint",
            //         width: 20,
            //         height: 20,
            //         paintStyle: { fill: "#f0eaea", strokeWidth: 3 },
            //         hoverPaintStyle: { outlineStroke: "lightblue" },
            //         anchors: ["Right", "Left", "Bottom", "Top"],
            //         maxConnections: 3
            //     }]
            

            if (this.props.notes != undefined) {
                this.props.notes.forEach(note => {
                    jsPlumb.addEndpoint(note, common);
                });
            }

            if (this.props.connections != undefined) {
                this.props.connections.forEach(connection => {
                    console.log(connection);
                    console.log(connection[0]);
                    console.log(connection[1]);
                    jsPlumb.connect({
                        source: connection[0],
                        target: connection[1],
                        common
                    });
                })
            }

        }.bind(this), 1500);
    }

    render() {
        return (
            <div id="diagramContainer">
                <div id="item_left" className="item"></div>
                <div id="item_right" className="item"></div>
            </div>
        );
    }
}

export default Diagram;