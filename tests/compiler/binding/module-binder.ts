import "jasmine";
import { verifyCompilationErrors } from "../helpers";
import { Diagnostic, ErrorCode } from "../../../src/compiler/utils/diagnostics";
import { CompilerRange } from "../../../src/compiler/syntax/ranges";

describe("Compiler.Binding.ModuleBinder", () => {
    it("reports sub-modules with duplicate names", () => {
        verifyCompilationErrors(`
Sub x
EndSub

Sub y
EndSub

Sub x
EndSub`,
            // Sub x
            //     ^
            // Another sub-module with the same name 'x' is already defined.
            new Diagnostic(ErrorCode.TwoSubModulesWithTheSameName, CompilerRange.fromValues(7, 4, 7, 5), "x"));
    });
});
