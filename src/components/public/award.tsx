import { Carousel, Col, Modal, Row, Tag, Tooltip } from 'antd';
import React, { Dispatch } from 'react';
import {
    ModalAwardStyle,
    ModalContentStyle,
    ModalTagStyle,
    ModalTagUncompletedStyle,
} from '../../app/style';
import '../css/raw.css';
import { GameState } from './game';
import {
    Achivement,
    Rarity,
    groupbyHistoryAchivementBySeries,
} from './statistic/statistic';
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
            let legendClass = '';
            if (value.color === Rarity.LEGEND) {
                legendClass = 'modal-tag-legend';
            }
            awardItemsReact.push(
                <AchivementTag
                    key={value.id}
                    value={value}
                    legendClass={legendClass}
                />,
            );
        });
        awardReact.push(
            <Row
                key={i}
                justify="center"
                style={{
                    width: '100%',
                    flexWrap: 'wrap',
                }}
                className="award-row"
            >
                <Col span={22} offset={1}>
                    {awardItemsReact}
                </Col>
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
            <div style={{ ...ModalContentStyle }}>
                <div style={{ ...ModalAwardStyle }}>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '10px 0',
                            fontSize: '20px',
                        }}
                    >
                        {titles[carouselIdx]}类
                    </div>
                    <Carousel
                        autoplay={false}
                        arrows={true}
                        afterChange={handleAwardsCarouselChange}
                        style={{ padding: '20px' }}
                    >
                        {awardReact}
                    </Carousel>
                </div>
            </div>
        </Modal>
    );
};

const AchivementTag: React.FC<{ value: Achivement; legendClass: string }> = ({
    value,
    legendClass,
}) => {
    return (
        <Tooltip title={value.note} placement="top">
            <Tag
                // className={setAwardClass(val)}
                color={value.color}
                style={{
                    ...ModalTagStyle,
                    ...(!value.completed ? ModalTagUncompletedStyle : {}),
                }}
                className={legendClass}
            >
                {value.name}
            </Tag>
        </Tooltip>
    );
};
export default Awards;
export { AchivementTag };
