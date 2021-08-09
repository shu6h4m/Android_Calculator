window.onload = function () {

    // initiliation variables
    var keys = document.getElementsByTagName('button'),
        operators = ['/', '*', '-', '+', '%'],
        lastOperator = '',
        decimalAdded = false;

    // Loop all key
    for (var i = 0; i < keys.length; i++) {

        // Add click event listener to all key
        keys[i].onclick = function () {

            // Add initial variables
            var keyValue = this.innerHTML,
                previous = document.getElementById('previous'),
                Previous_value = previous.innerHTML,
                lastChar = Previous_value[Previous_value.length - 1],
                current = document.getElementById('current-value');


            // Use switch case for different function of keys
            switch (keyValue) {
                // Case for clearing the calculator
                case 'AC':
                    current.innerHTML = '0';
                    previous.innerHTML = '';
                    break;
                // Show the current for calculation
                case '=':
                    if (previous.innerHTML != '') {

                        current.innerHTML = eval(Previous_value);
                        previous.innerHTML = current.innerHTML;
                        if (((previous.innerHTML).includes("."))) {
                            decimalAdded = true;
                        }
                    }
                    else {
                        previous.innerHTML = current.innerHTML;
                    }

                    if (previous.innerHTML == "Infinity" || current.innerHTML == "Infinity") {
                        previous.innerHTML = "";

                    }


                    resultLength = (current.innerHTML).length;

                    if (resultLength > 14) {
                        current.innerHTML = (current.innerHTML).substring(0, 12);
                        previous.innerHTML = current.innerHTML;
                    }
                    break;
                // Case for arithmatic operator
                case '/':
                case '*':
                case '-':
                case '+':
                case '%':
                    if (Previous_value != '' && operators.indexOf(lastChar) == -1) {
                        previous.innerHTML += keyValue;
                    }
                    else {
                        previous.innerHTML = previous.innerHTML.replace(/.$/, keyValue);
                    }
                    decimalAdded = false;
                    lastOperator = keyValue;
                    break;
                // Case for delete char
                case 'C':

                    decimalAdded = false;
                    previous.innerHTML = previous.innerHTML.replace(/.$/, '');
                    current.innerHTML = eval(previous.innerHTML);
                    if (current.innerHTML == "undefined") {
                        current.innerHTML = "0";
                    }
                    break;
                // Case for add period
                case '.':

                    if (!decimalAdded) {
                        if ((lastChar == ")")) {
                            return;
                        }

                        else {
                            previous.innerHTML += keyValue;
                            decimalAdded = true;

                        }

                    }

                    break;
                case '+/-':

                    if (Previous_value != '' && operators.indexOf(lastChar) == -1) {
                        if (lastOperator == '') {
                            if (Previous_value == Math.abs(Previous_value)) {
                                previous.innerHTML = -(Previous_value);
                            } else {
                                previous.innerHTML = Math.abs(eval(Previous_value));
                            }
                        } else {
                            var array = previous.innerHTML.split(lastOperator),
                                lastIndex = array.length - 1,
                                newDetail = '',
                                oldDetail = '';

                            if (array[lastIndex] == Math.abs(array[lastIndex])) {
                                newDetail = '(' + -(array[lastIndex]) + ')';
                            } else {
                                newDetail = Math.abs(eval(array[lastIndex]));
                            }

                            for (var i = 0; i < lastIndex; i++) {
                                oldDetail += array[i] + lastOperator;
                            }

                            previous.innerHTML = oldDetail + newDetail;
                        }
                    }
                    break;
                default:
                    detailLength = (previous.innerHTML).length;
                    if (detailLength >= 27) {
                        previous.innerHTML += keyValue;
                        previous.innerHTML = (previous.innerHTML).slice(0, -1);
                        console.log(previous.innerHTML);
                        console.log(previous.innerHTML);
                        return
                    }

                    if ((lastChar == ")")) {
                        return;
                    }
                    else {
                        previous.innerHTML += keyValue;
                    }
                    break;
            }
        }
    }
}