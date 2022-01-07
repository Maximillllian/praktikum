export function readLessonHTML(courseName, themeName, lessonName) {
    const content = require(`~/static/lessons/${courseName}/${themeName}/${lessonName}.txt`);
    return content
}