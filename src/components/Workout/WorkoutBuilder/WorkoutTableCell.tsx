import React, { useContext, useRef, useState } from 'react';
import { Form, GetRef, Input } from 'antd';
import { EditableContext } from '@/components/Workout/WorkoutBuilder/WorkoutTableRow';

type InputRef = GetRef<typeof Input>;

interface Item {
  key: string;
  name: string;
  category: string;
  videoLink: string;
  sets: number;
  reps: number;
  rest: number;
}

interface TableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const WorkoutTableCell: React.FC<TableCellProps> = ({
                                                      title,
                                                      editable,
                                                      children,
                                                      dataIndex,
                                                      record,
                                                      handleSave,
                                                      ...restProps
                                                    }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    }
    catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
          },
        ]}
        style={{ marginBottom: '0' }}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default WorkoutTableCell;