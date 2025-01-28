import { Carousel, Modal, Row, Tag, Tooltip } from 'antd';
import React, { Dispatch } from 'react';

type AwardsProps = {
    open: boolean;
    setOpen: Dispatch<boolean>;
};

const Awards: React.FC<AwardsProps> = ({ open, setOpen }) => {
    // const handleOverlayClick = () => {
    //   // todo: implement overlay click logic
    // };
    const allAwards: any[] = [];
    const handleAwardsCarouselChange = () => {
        // todo: implement carousel change logic
    };

    return (
        <Modal
            title="全部评价"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <div className="modal-content">
                <div className="modal-award">
                    {/* <div style={{ textAlign: 'center' }}>
                        {allAwards[allAwardsIdx].name}类
                    </div> */}
                    <Carousel
                        autoplay={false}
                        afterChange={handleAwardsCarouselChange}
                    >
                        {allAwards.map((val, i) => (
                            <Row
                                key={i}
                                justify="center"
                                style={{ width: '100%', flexWrap: 'wrap' }}
                            >
                                <div key={val.id} className="award-item">
                                    <Tooltip title={val.note} placement="top">
                                        <Tag
                                            // className={setAwardClass(val)}
                                            color={val.color}
                                            style={{ border: 'none' }}
                                        >
                                            {val.title}
                                        </Tag>
                                    </Tooltip>
                                </div>
                            </Row>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Modal>
    );
};

export default Awards;
