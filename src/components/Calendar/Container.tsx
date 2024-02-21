import React from 'react';

import Group from './Group';

interface Exercise {
  title: string;
  category: string;
  video: string;
  sets: string;
  reps: string;
  rest: string;
}

interface Block {
  title: string;
  notes: string;
  exercises: Exercise[];
}

interface Group {
  title: string;
  blocks: Block[];
}

interface ContainerProps {
  id: string;
  items: Group[];
}

export default function Container({ id }: ContainerProps) {
  return (
    <Group/>
  )
}
