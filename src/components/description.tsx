import { Card } from 'antd';
const Description: React.FC = () => {
    return (
        <>
            <Card
                title="Default size card"
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
            ></Card>
            <Card
                title="Default size card"
                extra={<a href="#">More</a>}
                style={{ width: 300 }}
            ></Card>
            <Card
                title="Default size card"
                extra={<a href="#">123</a>}
                style={{ width: 300 }}
            ></Card>
            <Card
                title="Default size card"
                extra={<a href="#">345</a>}
                style={{ width: 300 }}
            ></Card>
        </>
    );
};

export default Description;
