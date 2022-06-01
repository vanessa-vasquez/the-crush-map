import React, { useEffect } from 'react';
import '../styles/CrushMap.css';
import cytoscape from 'cytoscape';
import spread from 'cytoscape-spread';

cytoscape.use(spread);

export default function Visualization(props){  
    const data = props.data;   
    const currentUserUni = props.userUni; 
    const crushes = props.crushes;
    const setCy = props.setCy;

    useEffect(() => {
        initializeMap(data);
    }, [data]);
    
    const initializeMap = (data) => {
        setCy(cytoscape({
            container: document.getElementById("cy"),
            elements: data, 
            layout: {
                name: 'spread'
            },
            style: [
            {
                selector: 'node',
                css: {
                    'label': (ele) => {
                        let nodeId = ele.data('id');

                        if (crushes.includes(nodeId)){
                            return nodeId; 
                        } else if (nodeId == currentUserUni){
                            return 'You';
                        }

                        return ''; 
                    }
                }
            },
            {
                selector: 'edge',
                css: {
                    'width': 3,
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            },
            {
                selector: ':selected',
                css: {
                    'color': '#ff5143',
                    'background-color': '#ff5143',
                    'target-arrow-color': '#ff5143',
                    'line-color': '#ff5143'
                }
            },              
            {
                selector: '#' + currentUserUni,
                css: {
                    'color': '#ff5143',
                    'background-color': '#ff5143'
                }
            },
            {
                selector: '.node-match',
                css: {
                    'color': '#ff5143',
                    'background-color': '#ff5143'
                }
            },
            {
                selector: '.edge-match',
                css: {
                    'target-arrow-color': '#ff5143',
                    'line-color': '#ff5143'
                }
            },
            {
                selector: '.child-node',
                css: {
                    'color': '#d856ff',
                    'background-color': '#d856ff',
                    'label': 'data(id)'
                }
            },
            {
                selector: '.child-edge',
                css: {
                    'target-arrow-color': '#d856ff',
                    'line-color': '#d856ff'
                }
            }],
            classes: ['node-match', 'edge-match', 'child-node', 'child-edge']
        }))
    }

    return (
        <div id="cy"></div>
    )
}