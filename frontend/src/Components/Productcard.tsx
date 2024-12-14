import { useNavigate } from "react-router";

const ProductCard = () => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate("/quickview");
    };

    const handleQuickview = () => {
        navigate("/quickview");
    };

    return (
        <>
        <button className='z-1' onClick={handleImageClick}>
                <div className="m-2 w-72 h-1024 ">
                    <div className="relative group w-full h-70">
                        <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHERUSBxMWFhUXFxUVFRcWGRcWGBgTFxIWGBUVGhoYHi4gGBolHhUWITIhJSkrLi4uGh8zOD8tNygvLisBCgoKDg0OFQ0QFS0dHR0tKysrNSstLSstKy0tKzcrLS0tLS0rKy43LSsrKzI3LSstLTctLSs4OCsrNzctKzcrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIDBAUGCAH/xABHEAACAQIDBQMHBwgJBQAAAAAAAQIDEQQFIQYHEjFBUWFxEyIyM4GRoSNCUoKxwdEUNENicpLC8BUXg6Oy0tPh4ghTVJOi/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBUSH/2gAMAwEAAhEDEQA/AJxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGvzvOstyGn5XNqsacL2V7tt9kYrWT7kiLNtd6Uqz8lkjcIxd5yT8+a4XaN16C4uFuzvZNPhejm7B2u1m8DKdma1KhiLzlJ/KcDXyUPpSXV9eHnZPuv1dKpCtFSpNOLSaa1TTV013HkTH1FJ8dOcpt3lNyioNSvryk+Lx0JW3RbwqWHUMDnUrRbthqj5Jv9BJ9NX5r7+HsKJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYuZ5lgsqpurmVSNOC5ym0lfou99yIq2y3vcLlR2XXRry8117acHzXPWXu6gSXnW0OUZCk83rQp8Xopvznbm1Fatd9iKdvd61XF2pbJzcIa+UquLjOXLhVO+sVzu2k+VrdYyzbNcdm1TyuY1HUqWUeOWr4U20vDV6d5h8V/SYGbmOcYvNJKWY1alWavZ1JOVl1Svy6cjCbvz+GlhKa6HzgqVFePJCimMorm/d+JTNJX0818+59pS4y5sqhPhA9WbEV62Jy/CyxVSNWbo0+OcZKSc1FKWq5u+j77m8PK+ye12b7Jzc8pneEmnUpT1hLvt0lb5y18VoTLs5ve2dzRJZk3hqnVT86nfraola37SiBIYOfxm2+y+DpupWxtCyV/NqRnJ9yjFtt9yRA22+2uN2uxDnByhh4ebRpX6dak0tHN/BaLq2HpkHmHZXbrPNmailQqSqU/nUakpODXde/k33r2p8j0hkeZ0s5w9LEYdNRqwjNJ81daxfenp7AM4AAAAAAAAAAAAAAAAHM7R7d5Bs9dYqqp1F+jp2nO/Y7aR+s0RhtBvizfF3jk8IUI/SfylTxu1wr3MCX872kybIbf0tXhTbV1F3cmu1RjdtewjnaXfHTiuHZ2k+LVOdZafquMYyu+r1t00IhxeYV8VJzxLcpvVybbbfa7mO6jfL+feBn5xnGY5zUdXMqkqk3fWT0j3RS0jHuRr5ST5mTl+V4/NZcOX051H1UVovFvSPtaOry/dhnmIs8S6dPuu5yX7q4f8A6A4i/ZofCS6W6eovznFL2U7fbMyobq8vXrMRVf7Kiv4WKI0hQpu1+y/Pw/EuRoRhyVvf39/YShT3a5ND05V39ZL+Eurd5s8lrTqPxqyX2SRib1qofxDV9ea0/AsMmmOwOzkP0DfjVqfdMy6Wx+QU/QwtP6yc+n66Zqogjy3BzdjNw2ExOMt5CjUnfrCE5fGKJ5oZVgMGvkKVKFvowhD7LFNfMcrwv5zWpx/amhREmB2HzvFP1Dgu2rJR+F3L4G/wW7PG1LflleEe6nGU3bxfDb3M6XF7d7OYPSNR1H2U4tr3vQ0WO3pNaZdQ9tSX8MR6jmds9no7PVYwhJyUocSbte/E000vBe8mjcxm7zPLYwnbioSdHTrGylB+NpW9hAue53i88qurjmm7WSSsoxV7JLs1ZJn/AE+5ioVMVh5v0o06sF3xcoz/AMUCiagAAAAAAAAAAAAGk2p2oyvZel5TM5au/BCOs5tc1Fdmqu3orojnLNupbVzryzLip0aFOdVUINeTnTitfKy0lOS7NI66rqcTvTzSvmGaYhV3pTl5KC7IwXTxbk/aYuy2Y/0NSxWJpL5Thp4ei3yUqznKbs9G1Gle34lwaqWFxlWl5byU/JJ2dRQl5NSk/R40uG99LXMNv+dDJx2Y4vHO+NqSny0bdlZWVo8o27EjE4osD6dZsNslU2jnxV7xoQa4n1m/oRfTTm+l11enMYPDVcbUhSw686clCPjJ2V+49D5LluHyfDwoYb0YJJvrKXzpPvbbftJou4LCYLKqap4CEYRXJRVl4977+pfvKWtZ+xBOEOwolGMtV+K/2Mj67v1aS7zVZ1neX5NHizKra97Jc34LmzZOtJaVFb7CGt6KrLHy8re3BDyfZw21t9a5cG+x+9GhC6y7DyfY5uy92rNPX3m51P1MKUPY395wzduZbcijr628DaCp+livCKNbidrM9xXrMRO36vm/YaC9ipu3IDKxGPxeI9fVnLxk395jtt8y3c+3Aruxa5RxBMC5yOt3dY+WW4/Cypu16kYS741X5Nr3NPxORpQdR2XtOq2KwzxOPwsY/wDepP2RqRk/ggPUAAAAAAAAAAAAACEt8GwuNniJ47LlxwqcLqRiryhKMVHistXFpJ37b3IpccTGLim+G97J3XEk1e3bZtHr2vhqVf1iOYzrd9kubvixC876VoN++1/iB5jfGvSCv0J2xO5bAT/NsVUj4xUvtZr625Go/V41fWpf8gI/3eQjUzCjx/N45e1U5W+0m2NddTiVuWzeg74XG0k1yfBOL98ZF5brdsaXqcxX/sxC+8g7P8phHkfHXg9Ve/8APPtOPqbvdvrWjjoP+1rJ++1zCqbtdvpc8VB+OIxD+1CDuauJSXn2S79F8eRxm2kchzenw4nEUoVI34JcUXJPsaWrXcYNTdLtjiPX1cK/2p1JP40z5/U5tW+dbC/vVP8ATEEZVqE4NxXnWbV43aevNN9CmOGrS6W8WSgtzO079LEYb31P9Mq/qW2kfPE4f+8/yFEZxwS+cy7+TUl0JIW5XaHriqH95/lPq3KbQf8Al0PdP8AI1eGp9hTLDQ7CTluVz3ri6H7s/wACtblc7+di6H7kwIpeGXefYYddbv2/giWFuUzd88ZRX9lN/wARdhuTx79ZjoLwov75gRbTpqPPTuX86kp7mNmK1ar+XYlWpwUo0r/Om1ZyX6qTav2vuZusk3O5dgpKeY1nXa+bKCUPbG7v7SR8Nh6eGio0tElZLlZLokuQF4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q=="
                            alt="Sample Image"
                            className="w-full h-full object-cover"
                        />
                        <button  onClick={handleQuickview}
                        className="absolute w-full h-10 bottom-0 z-40 flex items-center justify-center  bg-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View More
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center font-extrabold text-yellow-600">puma</div>
                        <div className="font-extralight">puma air jordans white</div>
                        <div className="font-bold">5,708</div>
                    </div>
                </div>
            </button>
        </>
    );
};

export default ProductCard;
