import { Modal } from 'antd';
import { Dispatch } from 'react';

type TutorialProps = {
    open: boolean;
    setOpen: Dispatch<boolean>;
};
const Tutorial: React.FC<TutorialProps> = ({ open, setOpen }) => {
    return (
        <Modal
            title="游戏说明"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={600}
            footer={null}
        >
            <div style={{ textAlign: 'center' }}>
                消耗一个🔍来得知一个格子的身份，同时触发对应的效果。
                <br />
                给你有限的🔍，找出绿色的目标即可获胜。 如果没有🔍，则视为失败
                <br />
            </div>
        </Modal>
    );
};

export { Tutorial };
