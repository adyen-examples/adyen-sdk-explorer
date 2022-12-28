import { Grid, Typography, Box, Link } from '@mui/material';

export const LinksGrid = ({ links }: any) => {
  return (
    <Grid container sx={{ p: 6 }}>
      {links.map((category: any) => (
        <Grid item xs={6}>
          <Typography variant="h4">{category.title}</Typography>
          {category.subcategories.map((subcategory: any) => (
            <Box>
              <Typography sx={{ pt: 2 }} variant="h6">{subcategory.title}</Typography>
              {subcategory.links.map((link: any) => (
                <Box sx={{ pt: 2 }}>
                  <Typography variant="h6" sx={{color:"#69778C"}}>
                    <Link underline="none" href={link.url}>
                      {link.title}
                    </Link>
                  </Typography>
                  <Typography variant="body2">{link.description}</Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};
