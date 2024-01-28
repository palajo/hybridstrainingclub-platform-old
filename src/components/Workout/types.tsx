import type { MutableRefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';

export interface TreeItem {
  id: UniqueIdentifier;
  children: TreeItem[];
  collapsed?: boolean;
}

export interface TableItem {
  id: UniqueIdentifier;
  name: string;
  age: number;
  key: string;
  address: string;
  children: TableItem[];
  collapsed?: boolean;
}

export type TreeItems = TreeItem[];
export type TableItems = TableItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
