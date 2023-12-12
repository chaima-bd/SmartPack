import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Typography,Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Orders Reception | SmartPack
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={5}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="12k MAD"
            />
          </Grid>
          
          <Grid
            xs={12}
            sm={6}
            lg={5}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={20}
            md={20}
            lg={20}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    id: 'C123',
                    name: 'Ekaterina Tankova',
                  },
                  address: {
                    city: 'Marrakech',
                    country: 'MAROC',
                    street: 'Gueliz'
                  },
                  createdAt: 1555016400000,
                  status: 'pending'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    id: 'C124',
                    name: 'Cao Yu',
                  },
                  address: {
                    city: 'Marrakech',
                    country: 'MAROC',
                    street: 'Gueliz'
                  },
                  createdAt: 1555016400000,
                  
                  status: 'delivered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    id: 'C125',
                    name: 'Alexa Richardson',
                  },
                  address: {
                    city: 'Marrakech',
                    country: 'MAROC',
                    street: 'Gueliz'
                  },
                  createdAt: 1554930000000,
                  
                  status: 'refunded'
                },
              
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
