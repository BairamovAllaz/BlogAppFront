import React from 'react'
import { Container, Paper, Typography, Box, CircularProgress, ImageListItem } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MainBlog({post , loading, error}) {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h6" component="h1" align="center" gutterBottom>
            Post Preview
          </Typography>
          
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : !post ? (
            <Typography align="center">No post found</Typography>
          ) : (
            <Box sx={{ width: '100%', maxWidth: 800 }}>
              <ReactMarkdown
                children={post.post_txt}
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <Typography variant="h4" component="h1" gutterBottom>
                      {children}
                    </Typography>
                  ),
                  h2: ({ children }) => (
                    <Typography variant="h5" component="h2" gutterBottom>
                      {children}
                    </Typography>
                  ),
                  h3: ({ children }) => (
                    <Typography variant="h6" component="h3" gutterBottom>
                      {children}
                    </Typography>
                  ),
                  img: ({ src, alt }) => {
                    if (!src) return null;
                    // Check if it's a base64 image
                    const isBase64 = src.startsWith('data:image/');
                    return (
                      <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                        <ImageListItem
                          component="img"
                          src={src}
                          alt={alt}
                          sx={{
                            maxWidth: '100%',
                            maxHeight: 600,
                            objectFit: 'contain',
                            borderRadius: 1,
                            boxShadow: 2,
                          }}
                        />
                        {alt && (
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ mt: 1, color: 'text.secondary' }}
                          >
                            {alt}
                          </Typography>
                        )}
                      </Box>
                    );
                  },
                  p: ({ children }) => (
                    <Typography paragraph>
                      {children}
                    </Typography>
                  ),
                  code: ({ inline, className, children }) => (
                    <Typography
                      component="code"
                      className={className}
                      style={{
                        backgroundColor: '#f5f5f5',
                        padding: inline ? '2px 4px' : '16px',
                        borderRadius: inline ? '2px' : '4px',
                        fontFamily: 'monospace',
                      }}
                    >

                      {children}
                    </Typography>
                  ),
                  a: ({ href, children }) => (
                    <Typography
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2', textDecoration: 'underline' }}
                    >
                      {children}
                    </Typography>
                  ),
                }}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default MainBlog
