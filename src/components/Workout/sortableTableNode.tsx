import React from 'react';

import { CSS } from '@dnd-kit/utilities';

import { MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { theme } from 'antd';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

export default function SortableTreeNode({ children, ...props }: RowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();


  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === 'title') {
          const { record } = child.props;

          const { id, title } = record;
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <span>
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{ touchAction: 'none', cursor: 'move' }}
                  {...listeners}
                />
                <span style={{ paddingLeft: `12px`, color: '#4EB1F3' }}>
                  {title}
                </span>
              </span>
            ),
            record,
          });
        }
        return child;
      })}
    </tr>
  );
}
