statement="";
flag=false;
function empty(){
    dot=false;
    op=false;
    dot_in_operand=[];
    count_op = 0;
    p_count = 0;
}

empty();

String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
}


$("button").on("click",calculation)

function calculation(){
    let c = this.classList[0];
    console.log(c);
    document.getElementById("ae").classList.replace('ac','ce');
    $("#ae").html("<p>CE</p>");
    switch(c){

        case 'number':
            statement=statement+this.id;
            // allowing operator
            op=false; 
            console.log(statement);
            $("h1").text(statement);
        break;

        case 'operator':
            
            if(this.id=="(" || this.id==")"){
                if(this.id=="(" && statement[statement.length-1]!="("){
                    p_count++;
                    statement=statement+this.id;
                    count_op++;
                    if(dot===false){
                        dot_in_operand.push(false)
                    }
                    else{
                        dot_in_operand.push(true);
                    }
                    dot=false;
                }
                if(this.id==")" && p_count>0){
                    p_count--;
                    statement=statement+this.id;
                    count_op++;
                    if(dot===false){
                        dot_in_operand.push(false)
                    }
                    else{
                        dot_in_operand.push(true);
                    }
                    dot=false;
                }
                $("h1").text(statement);
                console.log(statement);
                console.log(dot_in_operand);
            }
            else{
                // checking for operator
                if(op===false && statement[statement.length-1]!="("){                    
                    statement=statement+this.id;
                    count_op++;
                    // console.log(count_op);
                    if(dot===false){
                        dot_in_operand.push(false)
                    }
                    else{
                        dot_in_operand.push(true);
                    }
                    // deny operator
                    op=true;                        
                    console.log(dot_in_operand);
                }
                else{
                    if(statement[statement.length-1]=="(")
                        $("h1").text(statement);
                    // swapping sign of operators if different
                    else if(this.id!=statement[statement.length-1]){
                        statement=statement.replace(statement[(statement.length)-1],this.id);
                    }
                }
                dot=false;

                console.log(statement);
                $("h1").text(statement);
            }
            
        break;

        case 'dot':
            if(dot===false){
                statement=statement+this.id;
                dot=true;
                console.log(statement);
                $("h1").text(statement);
            }
        break;

        case 'ac':
            w = document.getElementById("ae").classList;
            console.log(w);
            empty();
            statement="";
            $("h1").text(statement);
        break;

        case 'ce':
            var last = statement[(statement.length)-1];
            console.log(statement.length)
            // console.log(last);
            if(last == '+' || last == '-' || last == '%' || last == '×' || last == '÷'){
                count_op--;
                op=false;
                dot=dot_in_operand[count_op];
                dot_in_operand.pop();
                // console.log(count_op);
            }
            if(last=="(" || last==")"){
                count_op--;
                dot=dot_in_operand[count_op];
                dot_in_operand.pop();
            }

            console.log(dot_in_operand)

            if(last===".")
                dot=false;
            if(last=="(")
                p_count--;
            if(last==")")   
                p_count++;

            statement=statement.replaceAt(statement.length-1,"");
            var last = statement[(statement.length)-1];
            if(last === '+' || last === '-' || last === '%' || last === '×' || last === '÷'){
                op=true;
            }
        

            console.log(statement);
            $("h1").text(statement);
        break;

        case 'equal':
            try{
                while(p_count!=0){
                    statement=statement+")";
                    p_count--;
                }
                if(statement!=""){
                    temp = statement.split("");
                    // console.log("enter");
                    for(i=temp.length-2;i>0;i--){
                        if(temp[i]=="(" && !(temp[i-1]=="×" || temp[i-1]=="÷" || temp[i-1]=="%" || temp[i-1]=="-" || temp[i-1]=="+" )){
                            temp.splice(i,0,"×");
                        }
                        if(temp[i]==")" && !(temp[i+1]==")" || temp[i+1]=="×" || temp[i+1]=="÷" || temp[i+1]=="%" || temp[i+1]=="-" || temp[i+1]=="+" )){
                            temp.splice(i+1,0,"×");
                        }
                    }
                    statement=temp.join("");
                    console.log(statement);
                
                    statement = statement.replaceAll("÷","/");
                    statement = statement.replaceAll("×","*");
                    statement = String(eval(statement));

                    
                    empty();
                    if(statement.split("").includes("."))
                        dot=true;
                    else
                        dot=false;
                }
                console.log(statement);
                $("h1").text(statement);
            }
            catch{
               $("h1").text("Error");
               empty();
            }
            $("#ae").html("<p>AC</p>");
            document.getElementById("ae").classList.replace('ce','ac');
            w = document.getElementById("ae").classList;
            console.log(w);
        break;
    }
};

$("body").on("keydown",function(e){
    k = e.key;
    if(/[0-9]/.test(k)){
        $("#"+k).trigger("click");
        console.log("hii");
    }
    else if(k=="+" ){
        $(".plus").trigger("click");
    }
    else if(k == "-"){
        $(".minus").click();
    }
    else if(k=="*"){
        $(".multiply").click();
    }
    else if(k=="/"){
        $(".divide").click();
    }
    else if(k=="%"){
        $(".modulo").click();
    }
    else if(k=="("){
        $(".lb").click();
    }
    else if(k==")"){
        $(".rb").click();
    }
    else if(k=="."){
        $(".dot").trigger("click");
    }
    else if(k==="Backspace"){
        $("#ae").click();
    }
    else if(k==="Enter" || k==="="){
        $(".equal").click();
        console.log("Enter");
    }
    console.log(e);
});
