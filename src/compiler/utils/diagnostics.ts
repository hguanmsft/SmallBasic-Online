import { CompilerRange } from "../syntax/ranges";
import { CompilerUtils } from "./compiler-utils";
import { DiagnosticsResources } from "../../strings/diagnostics";

export enum ErrorCode {
    // Scanner Errors
    UnrecognizedCharacter,
    UnterminatedStringLiteral,

    // Line Parser Errors
    UnrecognizedCommand,
    UnexpectedToken_ExpectingExpression,
    UnexpectedToken_ExpectingToken,
    UnexpectedToken_ExpectingEOL,
    UnexpectedEOL_ExpectingExpression,
    UnexpectedEOL_ExpectingToken,

    // Tree Parser Errors
    UnexpectedCommand_ExpectingCommand,
    UnexpectedEOF_ExpectingCommand,
    CannotDefineASubInsideAnotherSub,
    CannotHaveCommandWithoutPreviousCommand,
    ValueIsNotANumber,

    // Binder Errors
    TwoSubModulesWithTheSameName,
    LabelDoesNotExist,
    UnassignedExpressionStatement,
    InvalidExpressionStatement,
    UnexpectedVoid_ExpectingValue,
    UnsupportedArrayBaseExpression,
    UnsupportedCallBaseExpression,
    UnexpectedArgumentsCount,
    PropertyHasNoSetter,
    UnsupportedDotBaseExpression,
    LibraryMemberNotFound,
    ValueIsNotAssignable,
    ProgramKindChanged,

    // Runtime Errors
    CannotUseAnArrayAsAnIndexToAnotherArray,
    CannotUseOperatorWithAnArray,
    CannotUseOperatorWithAString,
    CannotDivideByZero,
    PoppingAnEmptyStack
}

export class Diagnostic {
    public readonly args: ReadonlyArray<string>;
    public constructor(
        public readonly code: ErrorCode,
        public readonly range: CompilerRange,
        ...args: string[]) {
        this.args = args;
    }

    public toString(): string {
        const template = DiagnosticsResources.get(ErrorCode[this.code]);

        if (!template) {
            throw new Error(`Error code ${ErrorCode[this.code]} has no string resource`);
        }

        return CompilerUtils.formatString(template, this.args);
    }
}
