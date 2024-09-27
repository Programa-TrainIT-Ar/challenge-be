/* eslint-disable */
export default async () => {
    const t = {
        ["./module/dto/module.dto"]: await import("./module/dto/module.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./module/dto/module.dto"), { "CreateModuleDto": { name: { required: true, type: () => String }, is_active: { required: false, type: () => Boolean } }, "UpdateModuleDto": { name: { required: false, type: () => String }, is_active: { required: false, type: () => Boolean } }, "ModuleDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, is_active: { required: true, type: () => Boolean } } }], [import("./cell/dto/cell.dto"), { "CreateCellDto": { name: { required: true, type: () => String }, is_active: { required: true, type: () => Boolean }, module_id: { required: true, type: () => String } }, "UpdateCellDto": { name: { required: false, type: () => String }, is_active: { required: false, type: () => Boolean }, module_id: { required: false, type: () => String } }, "CellDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, is_active: { required: true, type: () => Boolean }, module: { required: true, type: () => t["./module/dto/module.dto"].ModuleDto } } }], [import("./quiz/dto/create-quiz.dto"), { "CreateQuizDto": { name: { required: true, type: () => String }, description: { required: false, type: () => String }, skill_level_id: { required: true, type: () => String }, challenge_type: { required: true, type: () => Object }, max_time: { required: false, type: () => Number, minimum: 1 }, created_by_id: { required: true, type: () => String }, is_active: { required: true, type: () => Boolean, default: true } } }], [import("./quiz/dto/update-quiz.dto"), { "UpdateQuizDto": {} }], [import("./quiz/entities/quiz.entity"), { "QuizEntity": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: false, type: () => String, nullable: true }, skill_level_id: { required: true, type: () => String }, challenge_type: { required: true, type: () => Object }, max_time: { required: false, type: () => Number }, created_by_id: { required: true, type: () => String }, is_active: { required: true, type: () => Boolean, default: true } } }], [import("./question/dto/create-question.dto"), { "CreateQuestionDto": { question: { required: true, type: () => String }, seniority: { required: true, type: () => Object }, type: { required: true, type: () => Object }, options: { required: true, type: () => [String] }, correct_option: { required: true, type: () => [Number], minimum: 1 }, explanation: { required: false, type: () => String }, link: { required: false, type: () => String }, is_active: { required: true, type: () => Boolean, default: true } } }], [import("./question/dto/update-question.dto"), { "UpdateQuestionDto": {} }], [import("./question/entities/question.entity"), { "QuestionEntity": {} }], [import("./skill-level/dto/create-skilllevel.dto"), { "CreateSkillLevelDto": { cell_id: { required: true, type: () => String }, seniority: { required: true, type: () => Object } } }], [import("./skill-level/dto/update-skilllevel.dto"), { "UpdateSkillLevelDto": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "getLogout": { type: String }, "getCallBack": { type: String }, "getProtected": { type: String } } }], [import("./usuarios/usuarios.controller"), { "UsuariosController": { "findAll": {}, "findOne": {}, "create": {}, "update": {}, "remove": {} } }], [import("./module/module.controller"), { "ModuleController": { "getAllModules": {}, "createModule": {}, "getModuleById": {}, "deleteModule": {}, "updateModule": {} } }], [import("./cell/cell.controller"), { "CellController": { "getAllCells": {}, "createCell": {}, "getCellById": {}, "deleteCell": {}, "updateCell": {} } }], [import("./quiz/quiz.controller"), { "QuizController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./question/question.controller"), { "QuestionController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "delete": {} } }], [import("./skill-level/skill-level.controller"), { "SkillLevelController": { "create": {}, "findAll": { type: [Object] }, "findOne": { type: Object }, "update": {}, "delete": {} } }]] } };
};