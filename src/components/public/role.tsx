import React from 'react';
import Role from '../../models/role';

const RoleLabel: React.FC<{ role: Role }> = props => {
    const { role } = props;
    return (
        <span
            style={{
                color: `${role.color}`,
            }}
        >
            <b>{role.name}</b>
        </span>
    );
};
export { RoleLabel };
