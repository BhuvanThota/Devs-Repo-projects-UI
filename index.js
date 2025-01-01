const projectsWrapper = document.getElementById('projects_wrapper');
const logoutBtn = document.getElementById('logout_btn');
const devsProjectsAPI = "http://127.0.0.1:8000/api/projects/";
const login_page_path = 'http://127.0.0.1:5500/login_dev.html';
let access_token = localStorage.getItem('access_token');

if (access_token === null){
    console.log('Please login first!');
    window.location = login_page_path;
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('access_token');
    window.location = login_page_path;
});

const getProjects = () => {
    fetch(devsProjectsAPI)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        buildProjects(data)
    })
}

const buildProjects = (projects) => {

    projectsWrapper.innerHTML = '';
    projects.map( (project) => {
        const projectCard = `
                        <div class="project_card">
                            <img
                                src="http://127.0.0.1:8000${project.featured_image}"
                                class="img-fluid rounded-top"
                            />
                            <div class="card_header">
                                <h3> ${project.title}</h3>

                                <strong class="vote_format">
                                    <button class="vote_btn" data-vote="down" data-project_id=${project.id}>&#8681;</button> 
                                    <p>
                                    Vote 
                                    </p> 
                                    <button class="vote_btn" data-vote="up" data-project_id=${project.id}>&#8679;</button>
                                </strong>  
                                <i>${project.vote_ratio}% Positive Feed</i>
                                <p>${project.description.substring(0,150)}...</p>
                            </div>
                        </div>    
                        `;
        projectsWrapper.innerHTML += projectCard;
    });
    
    addVoteEvents();

}

let addVoteEvents = () =>{
    let voteBtns = document.getElementsByClassName('vote_btn');
    for(let i = 0; i < voteBtns.length; i++){
        voteBtns[i].addEventListener("click",(e) => {
            let vote = e.target.dataset.vote;
            let projectId = e.target.dataset.project_id;

            console.log('Vote value:', vote, 'Project ID value:', projectId);
            
            fetch(`http://127.0.0.1:8000/api/project/${projectId}/vote`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    'value':vote,
                }),
            })
            .then(res => res.json())
            .then(data => {
                console.log("Success", data);
                getProjects();

            })

        });
    }
}

getProjects();



