import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes.js';
import styles from "./styles.css";

export const Box = function ({ name, callback, otherProps, secondCallback }) {
    const [{ isDragging }, drag] = useDrag({
        item: { name, otherProps, type: ItemTypes.NOTE },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                var randomColor = Math.floor(Math.random() * 16777215).toString(16);
                secondCallback(dropResult.props.noteID, randomColor);
                dropResult.callback(item.otherProps.noteID, randomColor);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.4 : 1;
    return (<>
        <div ref={drag} /*className={styles.noteblock}*/ /*style={{ ...styles.noteblock, opacity }}*/>
            <input
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
