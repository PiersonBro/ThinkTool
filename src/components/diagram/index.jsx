import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import styles from './styles.css';
import firebase from "firebase";
import "core-js/stable";
import "regenerator-runtime/runtime";
import debounce from "lodash.debounce";
import 'jsplumb';

// TODO:
// 1: Obtain the IDs of the notes connected through the UI
// 2: Check if connection is new. If it is not, detach
// 3: Access the DB for the "source" note
// 4: Add new connection to "relatedNotes" attribute
// 5: Save changes

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

            var j = (window.j = jsPlumb.getInstance({
                Container: ".src-components-home-styles__main",
            }));

            const connectionColor = "#52AFCC";

            // Styling for new connections
            var common = {
                isSource: true,
                isTarget: true,
                endpoint: ["Rectangle", {
                    cssClass: styles.diagramPoint,
                    hoverClass: styles.diagramHover,
                    maxConnections: 3,
                }],
                paintStyle: { fill: "#ffffff00" },
                connectorStyle: { outlineStroke: connectionColor, strokeWidth: 2 },
                connectorHoverStyle: { strokeWidth: 3 },
                // overlays: [
                //     ["Arrow", {
                //         foldback: 1,
                //         location: .96,
                //         width: 30,
                //         paintStyle: { fill: connectionColor },
                //     }],
                // ],
            };

            // Styling for connections
            var connectionCommon = {
                cssClass: styles.diagramConnect,
                hoverClass: styles.diagramConnectHover,
            }

            const endpointX = 130;
            const endpointY = 30;

            if (this.props.notes != undefined) {
                this.props.notes.forEach(note => {

                    jsPlumb.addEndpoint(note, {
                        anchor: "Bottom",
                        endpoint: ["Rectangle", {
                            cssClass: styles.diagramPoint,
                            hoverClass: styles.diagramHover,
                            maxConnections: 3,
                            width: endpointX,
                            height: endpointY,
                        }]
                    }, common);
                    jsPlumb.addEndpoint(note, {
                        anchor: "Right",
                        endpoint: ["Rectangle", {
                            cssClass: styles.diagramPoint,
                            hoverClass: styles.diagramHover,
                            maxConnections: 3,
                            width: endpointY,
                            height: endpointX,
                        }]
                    }, common);
                    jsPlumb.addEndpoint(note, {
                        anchor: "Left",
                        endpoint: ["Rectangle", {
                            cssClass: styles.diagramPoint,
                            hoverClass: styles.diagramHover,
                            maxConnections: 3,
                            width: endpointY,
                            height: endpointX,
                        }]
                    }, common);
                });
            }

            if (this.props.connections != undefined) {
                this.props.connections.forEach(connection => {
                    jsPlumb.connect({
                        source: connection[0],
                        target: connection[1],
                        paintStyle: { outlineStroke: connectionColor, strokeWidth: 2 },
                        connectorHoverStyle: { strokeWidth: 3 },
                    }, connectionCommon);
                });
            }

            var connectionList = jsPlumb.getConnections({
                scope: this,
            });
            console.log(connectionList);

            connectionList.forEach((connection => {
                console.log(connection.sourceId);
                console.log(connection.targetId);
            }));
        }.bind(this), 1500);
    }

    render() {
        return (
            <div id="diagramContainer">
            </div>
        );
    }
}

export default Diagram;