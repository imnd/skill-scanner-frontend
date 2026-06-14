const baseUrl = 'http://localhost:3000';
const baseAppUrl = 'http://edvisor-backend/';
const apiUrl = baseAppUrl + 'api/v1';
const redirectUrl = baseAppUrl + 'redirect?link=';

export const environment = {
  apiUrl,
  baseUrl,
  redirectUrl,
  cdnUrl: '',
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
