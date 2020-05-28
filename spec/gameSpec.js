describe("Slot-machine", function(){
    describe("getScore tests", function(){

        // Mask scenarions
        it("3 masks should return 500", function(){
            expect(getScore(["mask","mask","mask"])).toBe(500);
        });
        it("2 masks should return 200", function(){
            expect(getScore(["mask","mask","cough"])).toBe(200);
            expect(getScore(["hug","mask","mask"])).toBe(200);
        });
        it("1 mask with hgood actions should return 100 or 50", function(){
            expect(getScore(["hand-wash","alcool","mask"])).toBe(100);
            expect(getScore(["mask","alcool","alcool"])).toBe(50);
            expect(getScore(["mask","hand-wash","hand-wash"])).toBe(50);
        });
        it("1 mask with bad actions should return 0.5, 4 or 10", function(){
            expect(getScore(["mask","hug","hug"])).toBe(0.5);
            expect(getScore(["hug","mask","cough"])).toBe(4);
            expect(getScore(["hand-to-face","mask","cough"])).toBe(10);
            expect(getScore(["hand-to-face","cough","mask"])).toBe(4);
        });

        // Always loses scenarios
        it("Hug, last slot cough or first slot hand-to-face should return 0", function(){
            expect(getScore(["hug","cough","hand-wash"])).toBe(0);
            expect(getScore(["hand-to-face","alcool","hand-wash"])).toBe(0);
            expect(getScore(["alcool","cough","cough"])).toBe(0);
        });

        // Good Actions scenarios
        it("Only good actions should return 5, 10 or 20", function(){
            expect(getScore(["alcool","alcool","alcool"])).toBe(10);
            expect(getScore(["hand-wash","hand-wash","hand-wash"])).toBe(10);
            expect(getScore(["hand-wash","hand-wash","alcool"])).toBe(20);
            expect(getScore(["alcool","hand-wash","alcool"])).toBe(5);
        });

        // Cough scenarios
        it("Cough should return 0, 4 or 5", function(){
            expect(getScore(["cough","hand-to-face","alcool"])).toBe(0);
            expect(getScore(["alcool", "cough","hand-to-face"])).toBe(0);
            expect(getScore(["alcool", "cough","hand-wash"])).toBe(5);
            expect(getScore(["alcool", "cough","alcool"])).toBe(4);
            expect(getScore(["cough", "cough","alcool"])).toBe(2);

        });
    });
});