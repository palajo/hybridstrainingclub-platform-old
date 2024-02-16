import React from 'react';
import { Button, Col, theme, Typography } from 'antd';
import ModalBlock from '@/components/Calendar/ModalBlock';
import { CSS } from '@dnd-kit/utilities';
import { generate } from '@ant-design/colors';
import { useSortable } from '@dnd-kit/sortable';
import { MenuOutlined } from '@ant-design/icons';

interface SortableItemProps {
  id: string;
}
function Block({ id }: SortableItemProps) {
  const {
    token: { colorPrimary, borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px 12px',
    marginBottom: '24px',
    borderLeft: `3px solid ${generate(colorPrimary)[4]}`,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Button size="small" type="text" ref={setActivatorNodeRef}
              style={{ touchAction: 'none', cursor: 'move' }}{...listeners}>
        <MenuOutlined/>
      </Button>
      <Typography.Title level={5}>
        Round 1
      </Typography.Title>
      <Typography>
        Push ups, 3 sets x 10, 120s
      </Typography>
      <Typography>
        Push ups, 3 sets x 10, 120s
      </Typography>
      <Typography>
        Push ups, 3 sets x 10, 120s
      </Typography>
      <ModalBlock/>
    </div>
  );
}

export default Block;