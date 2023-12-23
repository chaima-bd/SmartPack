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
        Products Order| SmartPack
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
                  product_id: '0',
                  product_name: 'cahier',
                  quantity: '3',
                  id_oforder: '2',
                  status: 'pending'
                },
                {
                  product_id: '1',
                  product_name: 'crayon',
                  quantity: '1',
                  id_oforder: '2',
                  status: 'pending'
                },
                {
                  product_id: '2',
                  product_name: 'livre',
                  quantity: '1',
                  id_oforder: '2',
                  status: 'pending'
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
