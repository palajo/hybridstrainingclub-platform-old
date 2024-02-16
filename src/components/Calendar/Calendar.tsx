import React, { useState } from 'react';
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import dayjs from 'dayjs';
import Container from './Container';
import { Button, Col, Row, theme, Typography } from 'antd';
import Group from './Group';

interface Items {
  [key: string]: string[];
}

interface DefaultAnnouncements {
  onDragStart(id: string): void;

  onDragOver(id: string, overId: string | null): void;

  onDragEnd(id: string, overId: string | null): void;

  onDragCancel(id: string): void;
}

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
};

const defaultAnnouncements: DefaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    console.log(overId
      ? `Draggable item ${id} was moved over droppable area ${overId}.`
      : `Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    console.log(overId
      ? `Draggable item ${id} was dropped over droppable area ${overId}`
      : `Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function Calendar() {
  const { token: { colorBorder, paddingXS } } = theme.useToken();

  const [items, setItems] = useState<Items>({
    day1: ['1', '2'],
    day2: ['4', '5'],
    day3: ['7'],
    day4: [],
    day5: ['3'],
    day6: [],
    day7: ['6', '8'],
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [currentDate, setCurrentDate] = useState(dayjs());

  const goToPreviousWeek = () => setCurrentDate(currentDate.subtract(1, 'week'));
  const goToNextWeek = () => setCurrentDate(currentDate.add(1, 'week'));

  const handleDragStart = (event: { active: { id: string } }) => setActiveId(event.active.id);

  const handleDragOver = (event: {
    active: { id: string };
    over: { id: string | null };
    draggingRect?: DOMRect;
  }) => {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over || { id: null };

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId || '');

      let newIndex = overId in prev ? overItems.length + 1 : overIndex >= 0 ? overIndex + (overIndex === overItems.length - 1 && draggingRect?.offsetTop ? 1 : 0) : overItems.length + 1;

      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter((item) => item !== active.id),
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (event: {
    active: { id: string };
    over: { id: string | null };
  }) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over || { id: null };

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) return;

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId || '');

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  };

  const findContainer = (id: string) => id in items ? id : Object.keys(items).find((key) => items[key].includes(id)) || '';

  return (
    <Row gutter={[24, 24]}>
      <Col lg={24}>
        <Row justify="space-between" align="middle" gutter={[12, 16]}>
          <Col>
            <Button onClick={goToPreviousWeek}>Previous Week</Button>
          </Col>
          <Col>
            <Typography.Title level={3}>
              {currentDate.startOf('week').format('MMMM D, YYYY')} - {currentDate.endOf('week').format('MMMM D, YYYY')}
            </Typography.Title>
          </Col>
          <Col>
            <Button onClick={goToNextWeek}>Next Week</Button>
          </Col>
        </Row>
      </Col>
      <Col lg={24}>
        <DndContext
          announcements={defaultAnnouncements}
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Row justify="space-between">
            {[...Array(7)].map((_, index) => (
              <Col
                key={`day${index + 1}`}
                style={{
                  width: 'calc(100% / 7)',
                  border: `1px solid ${colorBorder}`,
                  borderLeft: `${index !== 0 && '0'}`,
                }}
              >
                <Row>
                  <Col
                    xs={24}
                    style={{ borderBottom: `1px solid ${colorBorder}`, padding: paddingXS }}
                  >
                    <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: '0' }}>
                      {currentDate.startOf('week').add(index, 'day').format('dddd')}
                    </Typography.Title>
                    <Typography style={{ textAlign: 'center' }}>
                      {currentDate.startOf('week').add(index, 'day').format('YYYY-MM-DD')}
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Container id={`day${index + 1}`} items={items[`day${index + 1}`]}/>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
          <DragOverlay>{activeId && <Group id={activeId}/>}</DragOverlay>
        </DndContext>
      </Col>
    </Row>
  );
}
