
// import React, { useState } from 'react';
// import { GoPlus, GoDash } from "react-icons/go";

// const NodeList = ({
//     backgroundColor = '#ffffff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     showAnimation = false,
//     nodes = [],
//     onSelectNode
// }) => {
//     const [selectedNodeId, setSelectedNodeId] = useState(null);
//     const [expandedNodes, setExpandedNodes] = useState(new Set());

//     const handleNodeClick = (node) => {
//         setSelectedNodeId(node.id);
//         // onSelectNode?.(node);
//         if (onSelectNode) {
//             onSelectNode({
//                 ...node,
//                 layoutId: node.layoutId || '', // Ensure layoutId is passed
//                 onClick: node.onClick // Pass the onClick identifier
//             });
//         }
//     };

//     const toggleDrawer = (nodeId) => {
//         setExpandedNodes(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(nodeId)) {
//                 newSet.delete(nodeId);
//             } else {
//                 newSet.add(nodeId);
//             }
//             return newSet;
//         });
//     };

//     // Enhanced grouping function to handle nested hierarchies
//     const groupNodes = (nodes) => {
//         // Get root level nodes (either isParent true or no parentId)
//         const rootNodes = nodes.filter(node => node.isParent || !node.parentId);

//         // Create a map of parent IDs to their children
//         const nodesByParent = nodes.reduce((acc, node) => {
//             if (node.parentId) {
//                 if (!acc[node.parentId]) {
//                     acc[node.parentId] = [];
//                 }
//                 acc[node.parentId].push(node);
//             }
//             return acc;
//         }, {});

//         return { rootNodes, nodesByParent };
//     };

//     // Recursive function to render a node and its children
//     const renderNode = (node, level = 0, nodesByParent) => {
//         const children = nodesByParent[node.id] || [];
//         const isExpanded = expandedNodes.has(node.id);
//         const hasChildren = children.length > 0;
//         const paddingLeft = level * 16; // Increase indentation for each level

//         return (
//             <div key={node.id} className="border-b border-gray-200">
//                 <div
//                     className={`flex items-center cursor-pointer hover:bg-gray-50 ${selectedNodeId === node.id ? 'bg-blue-50' : ''
//                         }`}
//                     style={{ paddingLeft: `${paddingLeft}px` }}
//                 >
//                     {node.allowChildren && (
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleDrawer(node.id);
//                             }}
//                             className="p-2 hover:bg-gray-100 rounded"
//                         >
//                             {isExpanded ? (
//                                 <GoDash className="w-4 h-4 text-gray-500" />
//                             ) : (
//                                 <GoPlus className="w-4 h-4 text-gray-500" />
//                             )}
//                         </button>
//                     )}
//                     <div
//                         className={`flex-1 py-2 px-4 ${!node.allowChildren ? 'pl-10' : ''}`}
//                         onClick={() => handleNodeClick(node)}
//                     >
//                         <div className="flex items-center justify-between">
//                             <div className="flex-1">
//                                 <div className="font-medium">{node.name}</div>
//                                 {/* <div className="text-sm text-gray-500">
//                                     Dashboard: {node.onClick || 'Not specified'}
//                                 </div> */}
//                             </div>
//                             {/* <span className="text-gray-500 text-sm ml-4">{node.refId}</span> */}
//                         </div>
//                     </div>
//                 </div>
//                 {hasChildren && isExpanded && (
//                     <div className="bg-gray-50">
//                         {children.map(child => renderNode(child, level + 1, nodesByParent))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     const { rootNodes, nodesByParent } = groupNodes(nodes);

//     return (
//         <div
//             className="w-full h-full flex flex-col"
//             style={{
//                 backgroundColor,
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//                 animation: showAnimation ? 'fadeIn 0.5s' : 'none'
//             }}
//         >
//             <div className="flex text-sm justify-center items-center p-2 border-b font-semibold text-gray-700">
//                 Dashboard Nodes
//             </div>
//             <div className="flex-1 overflow-auto">
//                 {nodes.length === 0 ? (
//                     <div className="p-4 text-gray-500 text-center">
//                         No dashboard nodes added yet.
//                         <br />
//                         <span className="text-sm">Use the properties panel to add nodes.</span>
//                     </div>
//                 ) : (
//                     <div className="divide-y divide-gray-200">
//                         {rootNodes.map(node => renderNode(node, 0, nodesByParent))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NodeList;


// import React, { useState } from 'react';
// import { GoPlus, GoDash } from "react-icons/go";

// const NodeList = ({
//     nodes = [],
//     onSelectNode,
//     backgroundColor = '#ffffff',
//     textColor = '#333333',
//     fontSize = '14px',
// }) => {
//     const [selectedNodeId, setSelectedNodeId] = useState(null);
//     const [expandedNodes, setExpandedNodes] = useState(new Set());

//     const handleNodeClick = (node) => {
//         setSelectedNodeId(node.id);
//         if (onSelectNode) {
//             onSelectNode({
//                 ...node,
//                 layoutId: node.layoutId || '',
//                 onClick: node.onClick
//             });
//         }
//     };

//     const toggleDrawer = (nodeId) => {
//         setExpandedNodes(prev => {
//             const newSet = new Set(prev);
//             if (newSet.has(nodeId)) {
//                 newSet.delete(nodeId);
//             } else {
//                 newSet.add(nodeId);
//             }
//             return newSet;
//         });
//     };

//     const renderNode = (node, level = 0) => {
//         const children = nodes.filter(child => child.parentId === node.id);
//         const isExpanded = expandedNodes.has(node.id);
//         const hasChildren = children.length > 0;
//         const paddingLeft = level * 16;

//         return (
//             <div key={node.id} className="border-b border-gray-200">
//                 <div
//                     className={`flex items-center cursor-pointer hover:bg-gray-200`}
//                     style={{ paddingLeft: `${paddingLeft}px`, color: textColor, fontSize }}
//                     onClick={() => handleNodeClick(node)}
//                 >
//                     {node.allowChildren && (
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleDrawer(node.id);
//                             }}
//                             className="p-2 hover:bg-gray-200 rounded"
//                         >
//                             {isExpanded ? (
//                                 <GoDash className="w-4 h-4 text-gray-500" />
//                             ) : (
//                                 <GoPlus className="w-4 h-4 text-gray-500" />
//                             )}
//                         </button>
//                     )}
//                     <div className={`flex-1 py-2 px-4 ${!node.allowChildren ? 'pl-10' : ''}`}>
//                         <div className="flex items-center justify-between">
//                             <div className="flex-1 font-medium">{node.name}</div>
//                             {/* <span className="text-gray-500 text-sm ml-4">{node.refId}</span> */}
//                         </div>
//                     </div>
//                 </div>
//                 {hasChildren && isExpanded && (
//                     <div className={`bg-${backgroundColor}`}>
//                         {children.map(child => renderNode(child, level + 1))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div
//             className="w-full h-full flex flex-col"
//             style={{
//                 backgroundColor,
//                 color: textColor,
//                 fontSize
//             }}
//         >
//             <div className="flex text-sm justify-center items-center p-2 border-b font-semibold" >
//                 Dashboard Nodes
//             </div>
//             <div className="flex-1 overflow-auto">
//                 {nodes.length === 0 ? (
//                     <div className="p-4 text-gray-500 text-center">
//                         No dashboard nodes added yet.
//                         <br />
//                         <span className="text-sm">Use the properties panel to add nodes.</span>
//                     </div>
//                 ) : (
//                     <div className="divide-y divide-gray-200">
//                         {nodes.filter(node => !node.parentId).map(node => renderNode(node))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default NodeList;



import React, { useState } from 'react';
import { GoPlus, GoDash } from "react-icons/go";

const NodeList = ({
    nodes = [],
    onSelectNode,
    backgroundColor = '#ffffff',
    textColor = '#333333',
    fontSize = '14px',
}) => {
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());

    const handleNodeClick = (node) => {
        setSelectedNodeId(node.id);
        if (onSelectNode) {
            onSelectNode({
                ...node,
                layoutId: node.layoutId || '',
                onClick: node.onClick
            });
        }
    };

    const toggleDrawer = (nodeId) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) {
                newSet.delete(nodeId);
            } else {
                newSet.add(nodeId);
            }
            return newSet;
        });
    };

    const renderNode = (node, level = 0) => {
        const children = nodes.filter(child => child.parentId === node.id);
        const isExpanded = expandedNodes.has(node.id);
        const hasChildren = children.length > 0;
        const isActive = selectedNodeId === node.id;

        return (
            <div key={node.id}>
                <div
                    className={`flex items-center cursor-pointer ${isActive ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
                    style={{ paddingLeft: `${level * 24}px`, color: textColor, fontSize }}
                    onClick={() => handleNodeClick(node)}
                >
                    {node.allowChildren && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleDrawer(node.id);
                            }}
                            className="p-2 hover:bg-gray-200 rounded"
                        >
                            {isExpanded ? (
                                <GoDash className="w-4 h-4 text-gray-500" />
                            ) : (
                                <GoPlus className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                    )}
                    <div className={`flex-1 py-2 px-4 ${!node.allowChildren ? 'pl-10' : ''}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex-1 font-medium">{node.name}</div>
                            {/* <span className="text-gray-500 text-sm ml-4">{node.refId}</span> */}
                        </div>
                    </div>
                </div>
                {hasChildren && isExpanded && (
                    <div className={`bg-${backgroundColor}`}>
                        {children.map(child => renderNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                backgroundColor,
                color: textColor,
                fontSize
            }}
        >
            <div className="flex text-sm text-black justify-center items-center p-2 border-b font-semibold" >
                Dashboard Nodes
            </div>
            <div className="flex-1 overflow-auto">
                {nodes.length === 0 ? (
                    <div className="p-4 text-gray-500 text-center">
                        No dashboard nodes added yet.
                        <br />
                        <span className="text-sm">Use the properties panel to add nodes.</span>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {nodes.filter(node => !node.parentId).map(node => renderNode(node))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NodeList;