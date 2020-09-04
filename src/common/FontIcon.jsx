import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FontIcon(props) {
    return (
        <span className="icon" role="img" aria-label="Font Icon">
            <FontAwesomeIcon {...props} />
        </span>
    );
}