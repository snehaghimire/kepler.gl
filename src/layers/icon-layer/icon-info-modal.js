// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import styled from 'styled-components';
import {line} from 'd3-shape'
import {svgIcons as SvgIcons} from 'layers/icon-layer/svg-icons.json';
import {Table, CenterFlexbox} from 'components/common/styled-components';

const lineFunction = line()
  .x(d => d[0] * 10)
  .y(d => d[1] * 10);

const IconShape = ({mesh}) => (
  <svg width="20px" height="20px">
    <g transform="translate(10, 10)">
    {mesh.cells.map((cell, i) =>
      <path key={i}
        fill="#000000"
            d={lineFunction(cell.map(idx => mesh.positions[idx]))}/>
    )}
    </g>
  </svg>
);

const StyledIconItem = styled(CenterFlexbox)`
  padding-left: 6px;
  width: 180px;
  height: 48px;
  margin-right: 12px;
  
  .icon-table_item__name {
    margin-left: 12px;
  }
`;

const StyledCode = styled.code`
  color: ${props => props.theme.titleColorLT};
`;

const StyledTitle = styled.div`
  font-size: 20px;
  letter-spacing: 1.25px;
  margin: 18px 0 14px 0;
  color: ${props => props.theme.titleColorLT};
`;

const IconItem = ({icon: {id, mesh}}) => (
  <StyledIconItem
    className="icon-table__item">
    <IconShape className="icon-table__item__shape" mesh={mesh}/>
    <div className="icon-table_item__name">
      <StyledCode>{id}</StyledCode>
    </div>
  </StyledIconItem>
);

const ExampleTable = () => (
  <Table className="icon-example-table">
    <thead>
    <tr>
      <th>point_lat</th>
      <th>point_lng</th>
      <th>icon</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>37.769897</td>
      <td>-122.41168</td>
      <td><StyledCode>android</StyledCode></td>
    </tr>
    <tr>
      <td>37.806928</td>
      <td>-122.40218</td>
      <td />
    </tr>
    <tr>
      <td>37.778564</td>
      <td>-122.39096</td>
      <td><StyledCode>calendar</StyledCode></td>
    </tr>
    <tr>
      <td>37.745995</td>
      <td>-122.30220</td>
      <td />
    </tr>
    <tr>
      <td>37.329841</td>
      <td>-122.103847</td>
      <td><StyledCode>control-off</StyledCode></td>
    </tr>
    </tbody>
  </Table>
);

const IconTable = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const IconInfoModal = () => (
  <div className="icon-info-modal">
    <div className="icon-info-modal__description">
      <span>
        In your csv, create a column, put the name of the icon you want to
        draw in it. You can leave the cell empty if you do not want the icon
        to show for some points. When the column is named{' '}
      </span>
      <code>icon</code>
      <span> Voyager will automatically create a icon layer for you.</span>
    </div>
    <div className="icon-info-modal__example">
      <StyledTitle>Example:</StyledTitle>
      <ExampleTable/>
    </div>
    <div className="icon-info-modal__icons">
      <StyledTitle>Icons</StyledTitle>
      <IconTable className="icon-info-modal__icons__table">
        {SvgIcons.map(icon => (
          <IconItem key={icon.id} icon={icon}/>
        ))}
      </IconTable>
    </div>
  </div>
);

const IconInfoModalFactory = () => IconInfoModal;
export default IconInfoModalFactory;
