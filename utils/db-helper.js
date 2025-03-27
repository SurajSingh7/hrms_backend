class DBHelper {
    static async findByIdOrFail(model, id) {
        try {
            const result = await model.findById(id);
            return result || null;
        } catch (error) {
            console.error(`DBHelper.findByIdOrFail Error: ${error.message}`);
            return null;
        }
    }

    static async findAllOrFail(model, skip, limit, sort, query) {
        try {
            const result = await model.find(query).skip(skip).limit(limit).sort(sort);
            return result.length > 0 ? result : null;
        } catch (error) {
            console.error(`DBHelper.findAllOrFail Error: ${error.message}`);
            return null;
        }
    }

    static async create(model, data) {
        try {
            return await model.create(data);
        } catch (error) {
            console.error(`DBHelper.create Error: ${error.message}`);
            return null;
        }
    }

    static async update(model, id, data) {
        try {
            return await model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error(`DBHelper.update Error: ${error.message}`);
            return null;
        }
    }

    static async delete(model, id) {
        try {
            return await model.findByIdAndDelete(id);
        } catch (error) {
            console.error(`DBHelper.delete Error: ${error.message}`);
            return null;
        }
    }

    static async softDelete(model,newStatus,id){
        try{
            return await model.findByIdAndUpdate(id,{status : newStatus},{new:true});
        }
        catch(error){
            console.error(`DBHelper.softDelete Error: ${error.message}`);
            return null;
        }
    }
}

export default DBHelper;
