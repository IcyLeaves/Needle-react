import { Row, Tag, Tooltip } from 'antd';

type RankItemsProps = {
    items: Item[];
};
type Item = {
    title: string;
    color: string;
    note: string;
    id: string;
};
const RankItems: React.FC<RankItemsProps> = ({ items }) => {
    return (
        <Row justify="center" style={{ width: '100%', flexWrap: 'wrap' }}>
            {items.map((item, i) => (
                <div
                    key={item.id}
                    // className="award-item"
                >
                    <Tooltip title={item.note}>
                        <Tag
                            // className={setCurrAwardClass(item)}
                            color={item.color}
                            style={{ border: 'none' }}
                        >
                            {item.title}
                        </Tag>
                    </Tooltip>
                </div>
            ))}
        </Row>
    );
};

export default RankItems;
