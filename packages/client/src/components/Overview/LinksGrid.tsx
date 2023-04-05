import { Grid, Typography, Box, Link } from '@mui/material';

export const LinksGrid = ({ links }: any) => {
  return (
    <Grid container justifyContent="space-around" sx={{ py: 6 }}>
      {links.map((category: any) => (
        <Grid key={category.title} item xs={12} md={5}>
          <Typography variant="h4">{category.title}</Typography>
          {category.subcategories.map((subcategory: any) => (
            <Box key={subcategory.title}>
              <Typography sx={{ pt: 2 }} variant="subtitle2">
                {subcategory.title}
              </Typography>
              {subcategory.links.map((link: any) => (
                <Box key={link.title} sx={{ pt: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#69778C' }}>
                    <Link underline="none" href={link.url}>
                      {link.title}
                    </Link>
                  </Typography>
                  <Typography variant="h6">{link.description}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};
