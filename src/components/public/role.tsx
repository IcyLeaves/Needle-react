import Role from '@/models/role';
import React from 'react';

// 带颜色的角色名称
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
