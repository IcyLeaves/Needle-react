import { Carousel, Modal, Row, Tag, Tooltip } from 'antd';
import React, { Dispatch } from 'react';
import { GameState } from './game';
import { groupbyHistoryAchivementBySeries } from './statistic/statistic';

type AwardsProps = {
    open: boolean;
    setOpen: Dispatch<boolean>;
    gameState: GameState;
};

const Awards: React.FC<AwardsProps> = ({ open, setOpen, gameState }) => {
    let [carouselIdx, setCarouselIdx] = React.useState(0);
    let awardReact: JSX.Element[] = [];
    let titles: string[] = [];
    groupbyHistoryAchivementBySeries(gameState.statistic).forEach((val, i) => {
        let awardItemsReact: JSX.Element[] = [];
        val.forEach((value, key) => {
            awardItemsReact.push(
                <div key={value.id} className="award-item">
                    <Tooltip title={value.note} placement="top">
                        <Tag
                            // className={setAwardClass(val)}
                            color={value.color}
                            style={{ border: 'none' }}
                        >
                            {value.name}
                        </Tag>
                    </Tooltip>
                </div>,
            );
        });
        awardReact.push(
            <Row
                key={i}
                justify="center"
                style={{ width: '100%', flexWrap: 'wrap' }}
            >
                {awardItemsReact}
            </Row>,
        );

        titles.push(val[0].series);
    });
    const handleAwardsCarouselChange = (currentSlide: number) => {
        setCarouselIdx(currentSlide);
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
                    <div style={{ textAlign: 'center' }}>
                        {titles[carouselIdx]}类
                    </div>
                    <Carousel
                        autoplay={false}
                        arrows={true}
                        afterChange={handleAwardsCarouselChange}
                    >
                        {awardReact}
                    </Carousel>
                </div>
            </div>
        </Modal>
    );
};

export default Awards;
