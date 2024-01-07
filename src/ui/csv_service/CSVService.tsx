import React, {ChangeEvent, useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import FlexContainer from "../../components/FlexContainer";
import Class from "../../model/Class";
import {classService, studentService} from "../../service/provider/ServiceProvider";
import {Fab} from "@mui/material";
import NavigationIcon from "@material-ui/icons/Navigation";
import ClassId from "../../model/identifier/ClassId";
import Student from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";
import {useNavigate} from "react-router-dom";
import languageEncoding from "detect-file-encoding-and-language";


interface CSVForm {
    studentName: string;
    studentEnglishName: string;
    className: string;
    tuitionDate: string;
}

const csvToJSON = (csvString: string): CSVForm[] => {
    console.log(csvString);
    const rows = csvString.split("\r\n");
    const jsonArray: CSVForm[] = [];
    const header = rows[0].split(",");

    for (let i = 1; i < rows.length; i++) {
        let obj: any = {};
        let row = rows[i].split(",");
        for (let j = 0; j < header.length; j++) {
            obj[header[j]] = row[j];
        }

        jsonArray.push(obj);
    }

    return jsonArray;
};


const CSVService: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [classList, setClassList] = useState<Array<Class>>([]);
    const [inputStudentList, setInputStudentList] = useState<CSVForm[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setClassList(await classService.getAllClass());
        })();
    }, []);

    function readCSVFromFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target?.result as string;

                resolve(result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            languageEncoding(file).then((fileInfo) => {
                // 라이브러리 이슈. EUC-KR 인코딩 못 잡음. Github issue 올릴 예정.
                const encoding: string = fileInfo.encoding === null ? 'EUC-KR' : fileInfo.encoding;
                reader.readAsText(file, encoding);
            });
        });
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file === undefined) return;
        if (file) setSelectedFile(file);
        readCSVFromFile(file).then((str: string) => setInputStudentList(csvToJSON(str)));
    };

    const submit = async () => {
        console.log(inputStudentList);
        const currentClassNameList: Array<string> = classList.map((classObject: Class) => classObject.name);
        const inputClassNameList: Array<string> = inputStudentList.map((data: CSVForm) => data.className);
        const filteredClassNameList: Array<string> = inputClassNameList.filter(
            (className: string) => !currentClassNameList.includes(className)
        );

        for (let filteredClassName of filteredClassNameList) {
            const newClass: Class = new Class(
                new ClassId("none"),
                filteredClassName,
                false
            );
            await classService.createClass(newClass);
        }

        const allClassList: Array<Class> = await classService.getAllClass();
        setClassList(allClassList);

        for (let inputStudent of inputStudentList) {
            const selectedClass: Class | undefined =
                allClassList.find((classObject: Class) => classObject.name === inputStudent.className);
            if (selectedClass === undefined) continue;

            const newStudent: Student = new Student(
                new StudentId("none"),
                [selectedClass.id],
                [inputStudent.className],
                inputStudent.studentName,
                inputStudent.studentEnglishName,
                new Date(),
                new Date(),
                new Date(inputStudent.tuitionDate)
            );

            await studentService.createStudent(newStudent);
        }

        navigate(-1);

    }

    return <Scaffold>
        <FlexContainer alignItems="center" {...{ padding: "20px" }}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <div>
                {selectedFile && (
                    <p>Selected File: {selectedFile.name}</p>
                )}
            </div>
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="flex-end" {...{ padding: "20px" }}>
            <Fab variant="extended" color="primary" onClick={submit}>
                <NavigationIcon />
                Submit
            </Fab>
        </FlexContainer>
    </Scaffold>;
}

export default CSVService;
