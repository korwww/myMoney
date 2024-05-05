import React from 'react';
import styled from 'styled-components';

export interface TableHeadItem {
  name: string;
  width: number;
}

interface AdminTableProps {
  tableHead: TableHeadItem[];
  children: React.ReactNode;
}

function AdminTable({ tableHead, children }: AdminTableProps) {
  return (
    <table>
      <THead>
        <tr>
          {tableHead.map(({ name, width }) => (
            <Th width={width} key={name}>
              {name}
            </Th>
          ))}
        </tr>
      </THead>

      <TBody>{children}</TBody>
    </table>
  );
}

const THead = styled.thead`
  height: 40px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.color.background};
`;

const Th = styled.th<Pick<TableHeadItem, 'width'>>`
  width: ${({ width }) => width}px;
  font-size: ${({ theme }) => theme.text['medium'].fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  line-height: 40px;
`;

const TBody = styled.tbody`
  tr {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #e1e1e1;
    line-height: 44px;
    td {
      font-size: ${({ theme }) => theme.text['medium'].fontSize};
      text-align: center;
      position: relative;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: ${({ theme }) => theme.button['small'].height};
        margin: 0 auto;
      }
    }
  }
`;

export default AdminTable;
