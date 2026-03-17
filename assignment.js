const http=require('http')
const url=require('url')
let students=[];

const generateId=()=>{                      //to generate the random id for each student
    return Date.now().toString();
};

const isValidEmail=(email)=>{                           //this is to check whether the email is valid or not(email validation)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const server=http.createServer((req,res)=>{
    res.setHeader('Content-Type','application.json');

    const parsedUrl=url.parse(req.url,true);
    const path=parsedUrl.pathname;
    const method=req.method;

   const sendResponse = (status, data) => {
    res.writeHead(status);
    res.end(JSON.stringify(data));
};

  // GET/students
    if (method === 'GET' && path === '/students') {
        return sendResponse(200, {
            success: true,
            data:students
        });
    }

    // GET /students/:id
    if (method==='GET' && path.startsWith('/students/')) {
        const id = path.split('/')[2];
        const student = students.find(s => s.id === id);

        if (!student) {
            return sendResponse(404, {
                success: false,
                message: 'Student not found'
            });
        }

        return sendResponse(200,{
            success: true,
            data: student
        });
    }

    // POST/students
    if (method==='POST' && path==='/students') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { name, email, course, year } = JSON.parse(body);

            // Validation
            if (!name || !email || !course || !year) {
                return sendResponse(400, {
                    success: false,
                    message: 'All fields are required'
                });
            }

            if (!isValidEmail(email)) {
                return sendResponse(400, {
                    success: false,
                    message: 'Invalid email format'
                });
            }

            if (year < 1 || year > 4) {
                return sendResponse(400, {
                    success: false,
                    message: 'Year must be between 1 and 4'
                });
            }

            const newStudent = {
                id: generateId(),
                name,
                email,
                course,
                year
            };

            students.push(newStudent);

            return sendResponse(201, {
                success: true,
                data: newStudent
            });
        });
        return;
    }

    // PUT/students/:id
    if (method === 'PUT' && path.startsWith('/students/')) {
        const id = path.split('/')[2];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const student = students.find(s => s.id === id);

            if (!student) {
                return sendResponse(404, {
                    success: false,
                    message: 'Student not found'
                });
            }

            const { name, email, course, year } = JSON.parse(body);

            // Validation
            if (!name || !email || !course || !year) {
                return sendResponse(400, {
                    success: false,
                    message: 'All fields are required'
                });
            }

            if (!isValidEmail(email)) {
                return sendResponse(400, {
                    success: false,
                    message: 'Invalid email'
                });
            }

            if (year < 1 || year > 4) {
                return sendResponse(400, {
                    success: false,
                    message: 'Year must be 1-4'
                });
            }

            // Update student
            student.name = name;
            student.email = email;
            student.course = course;
            student.year = year;

            return sendResponse(200, {
                success: true,
                data: student
            });
        });
        return;
    }

    // DELETE/students/:id
    if (method === 'DELETE' && path.startsWith('/students/')) {
        const id = path.split('/')[2];
        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return sendResponse(404, {
                success: false,
                message: 'Student not found'
            });
        }

        students.splice(index, 1);

        return sendResponse(200, {
            success: true,
            message: 'Student deleted'
        });
    }

    // 404 route
    sendResponse(404, {
        success: false,
        message: 'Route not found'
    });
});

// Start server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});



