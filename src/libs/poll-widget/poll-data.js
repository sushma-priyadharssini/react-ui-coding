export const POLLS = {
    lastUpdated: 1628634891,
    totalVotes: 5,
    question: 'Which is your favorite Movie Genre',
    options: [
        {
            id: 123,
            label: 'Action',
            count: 3,
            userVotedForOption: false,
        },
        {
            id: 124,
            label: 'Thriller',
            count: 2,
            userVotedForOption: false,
        },
        {
            id: 125,
            label: 'Rom-Com',
            count: 1,
            userVotedForOption: false,
        },
        // ...
    ],
    // Which option(s) the user has selected.
    selectedOptions: [],
};

/* Backend can store a list of user ids who opted for that option than users storing option ids, 
because options can be deleted in that case, the user based db column will have stale data */