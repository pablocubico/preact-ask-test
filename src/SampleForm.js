var SampleFormProps = {
  form: {
    saveDestination: 'http://coralasks.theguardian.com/ask/44',
    page: {
      id: 1,
      name: 'first_page',
      children: [
        {
          type: 'separator',
          component: 'Header',
          props: {
            text: 'An amazing Ask.',
          }
        },
        {
          type: 'field',
          component: 'TextField',
          props: {
            maxLength: 100,
            title: 'Would you impersonate others?',
            required: true
          }
        },
        {
          type: 'field',
          component: 'TextField',
          props: {
            maxLength: 100,
            title: 'Are you here just to troll or annoy people?',
            required: true
          }
        },
        {
          type: 'field',
          component: 'TextField',
          props: {
            maxLength: 100,
            title: 'Would you reveal other person\'s personal data?',
            required: true
          }
        },
        {
          type: 'field',
          component: 'TextArea',
          props: {
            maxLength: 400,
            title: 'Please paste a comment from you on another site'
          }
        },
        {
          type: 'field',
          component: 'Rating',
          props: {
            steps: 5,
            title: 'Rate yourself as a commenteer'
          }
        },
        {
          type: 'field',
          component: 'Audio',
          props: {
            steps: 5,
            title: 'Explain why should we let yourself comment on our site'
          }
        },
      ]
    }
  }
};

module.exports = { form: SampleFormProps.form };