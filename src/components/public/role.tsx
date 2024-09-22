import Role from '@/models/role';
import React from 'react';

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
