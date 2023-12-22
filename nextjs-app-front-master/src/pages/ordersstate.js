import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OrdersStates } from 'src/sections/overview/orders-states';

const Page = () => (
  <>
    <Head>
      <title>
        Orders State | SmartPack
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Typography variant="h4">
            Orders State
          </Typography>
          <Grid
            xs={20}
            md={20}
            lg={20}
          >
            <OrdersStates
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
        </Stack>
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
