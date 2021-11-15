import { useState } from 'react';
import '../css/member.css'

var member = [
  {
      id : 1,
      name : "김동연",
      email : "dongyeon1201@gmail.com",
      github : "https://github.com/Dongyeon1201"
    },
    {
        id : 2,
        name : "이종찬",
        email : "reljacer@gmail.com",
        github : "https://github.com/Lipeya"
    },
    {
        id : 3,
        name : "임채민",
        email : "chemin9898@gmail.com",
        github : "https://github.com/lacram"
    }
]

function Member() {

    return (
        <div className="Member">
            {
                member.map(function(item){
                    return(
                        <div>
                            <ul className="MemberView">
                                <li className="MemberName">{item.name}</li>
                                <li className="MemberInfo">Email - {item.email}</li>
                                <li className="MemberInfo">Github - {item.github}</li>
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    );
  
}

export default Member;