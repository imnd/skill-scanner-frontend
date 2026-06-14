const baseUrl = 'http://edvisor-backend.com';
const baseAppUrl = 'http://edvisor-backend.com/';
const apiUrl = baseAppUrl + 'api/v1';
const redirectUrl = baseAppUrl + 'redirect?link=';

export const environment = {
  baseUrl,
  baseAppUrl,
  apiUrl,
  redirectUrl,
  cdnUrl: 'https://cdn.example.com',
  seo: {
    index: {
      robots: true,
      title: '',
      description: '',
      og: {
        title: '',
        description: '',
        image: {
          path: '',
          width: '',
          height: '',
        },
      },
      twitter_card: '',
    },
    posts: {
      robots: true,
      title: '',
      description: '',
      og: {
        title: '',
        description: '',
        image: {
          path: '',
          width: '',
          height: '',
        },
      },
      twitter_card: '',
    },
    categories: {
      '': '',
    },
    schools: {
      '': '',
    },
    sales: {
      '': '',
    },
    courses: {
      '': '',
    },
    'privacy-policy': {
      '': '',
    },
    'terms-of-use': {
      '': '',
    },
    'about-us': {
      '': '',
    },
  },
};
