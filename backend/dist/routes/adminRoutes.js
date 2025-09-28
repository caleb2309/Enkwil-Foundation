"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminRouter = (0, express_1.Router)();
adminRouter.get('/pending-applications', adminController_1.getPendingApplications);
adminRouter.get('/approved-tutors', adminController_1.getApprovedTutors);
adminRouter.put('/application-status', adminController_1.updateApplicationStatus);
exports.default = adminRouter;
