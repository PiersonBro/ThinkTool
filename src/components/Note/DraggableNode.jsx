import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes.js';
import styles from "./styles.css";
// A draggable and editable Title Box.
//This code is slightly modified from the example code found here:
//https://react-dnd.github.io/react-dnd/examples
export const Title = function ({ name, callback, otherProps, secondCallback }) {
    const [{ isDragging }, drag] = useDrag({
        item: { name, otherProps, type: ItemTypes.NOTE },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                //Generate the color that visually represents the relationship.
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                //Both notes need to know a relationship has been formed between them.
                secondCallback(dropResult.props.noteID, randomColor);
                dropResult.callback(item.otherProps.noteID, randomColor);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // change opacity if we are dragging
    const opacity = isDragging ? 0.4 : 1;
    return (<>
        <div ref={drag}>
            <input
                // default title
                className={styles.noteblockInput}
                type='text'
                value={name}
                placeholder='Title'
                onChange={(event) => callback(event)}
            />
            <hr />
        </div>
    </>);
};
