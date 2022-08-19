function handler(req, res) {
    const eventId = req.query.eventId;

    if (req.method === 'POST') {
        // need to do server side validation here. 

        const { email, name, text } = req.body;

        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: "invalid input" });
            return;
        }

        console.log(email, name, text);
  
        const newComment = {
            id: new Date().toISOString(), email, name, text
        }
        res.status(201).json({ message: 'added comment', comment: newComment })

    }

    if (req.method === 'GET') {
            const dummyList =[
                {id : 'c1',name : 'Arya',text  : 'random comment 1'},
                {id : 'c2',name : 'Surya',text  : 'random comment 2'}
            ];

            res.status(200).json({comments : dummyList});

    }
} export default handler;