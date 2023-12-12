import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import React, { useState } from 'react';


import Checkbox from '@mui/material/Checkbox';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const {orders :initialOrders = [], sx } = props;
  const [orders, setOrders] = React.useState(initialOrders);

//--------WORK WITH API-----------//
  const handleStatusToggle = (orderId) => {
    setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order.id === orderId ? { ...order, isAvailable: !order.isAvailable } : order
    )
  );
    console.log(`Toggle status for order ${orderId}`);
  };
  //--------WORK WITH API-----------//

  return (
    <Card sx={sx}>
      <CardHeader title="Orders Reception" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order Id
                </TableCell>
                <TableCell>
                  Customer Id
                </TableCell>
                <TableCell>
                  Customer Name
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Availability
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.ref}
                    </TableCell>
                    <TableCell>
                      {order.customer.id}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {order.address.city},{order.address.street}
                    </TableCell>
                    {/* <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell> */}
                    <TableCell>
                      <Checkbox
                        checked={order.isAvailable}
                        onChange={() => handleStatusToggle(order.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
